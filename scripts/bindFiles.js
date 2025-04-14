const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const UPLOAD_FOLDER = './assets/todo';
const DONE_FOLDER = './assets/done';
const ERROR_FOLDER = './assets/error';
const BATCH_SIZE = 10;
const ODATA_URL = 'http://localhost:4004/waste/DumpingReports';
const SUPPORTED_FORMATS = ['.webp', '.heic', '.png', '.jpg', '.jpeg'];

// Map om foto_name naar report ID te linken
let reportsByFotoName = {};
let reportsByFotoNameLowerCase = {};

// Voeg deze functie toe aan het begin van het bestand, na de bestaande imports
async function debugReportById(reportId) {
    try {
        console.log(`🔍 Controleren van report ${reportId}...`);
        const response = await fetch(`${ODATA_URL}/${reportId}?$select=ID,foto_name`);
        if (!response.ok) {
            throw new Error(`Report ophalen mislukt: ${response.statusText}`);
        }
        const report = await response.json();
        console.log(`🔍 Report ${reportId} details:`, report);
        console.log(`🔍 foto_name waarde: "${report.foto_name}"`);
        return report;
    } catch (error) {
        console.error(`🔍 Debug error:`, error.message);
        return null;
    }
}

function ensureFoldersExist() {
    [DONE_FOLDER, ERROR_FOLDER].forEach(folder => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
            console.log(`📁 Map aangemaakt: ${folder}`);
        }
    });
}

function moveFile(sourcePath, success) {
    const fileName = path.basename(sourcePath);
    const destinationFolder = success ? DONE_FOLDER : ERROR_FOLDER;
    const destinationPath = path.join(destinationFolder, fileName);

    try {
        fs.renameSync(sourcePath, destinationPath);
        console.log(`📋 Bestand verplaatst naar ${success ? 'done' : 'error'}: ${fileName}`);
    } catch (error) {
        console.error(`❌ Fout bij verplaatsen van ${fileName}:`, error.message);
    }
}

// Nieuwe functie: Haal alle reports op en bouw een map van foto_name naar report ID
async function fetchAllReports() {
    try {
        console.log('📥 Ophalen van alle meldingen...');
        const response = await fetch(`${ODATA_URL}?$select=ID,foto_name`);

        if (!response.ok) {
            throw new Error(`Reports ophalen mislukt: ${response.statusText}`);
        }

        const data = await response.json();
        const reports = data.value || [];

        // Bouw een mapping op van foto_name -> report ID
        reportsByFotoName = {};
        reports.forEach(report => {
            if (report.foto_name) {
                reportsByFotoName[report.foto_name] = report.ID;
            }
        });

        console.log(`✅ ${Object.keys(reportsByFotoName).length} reports met foto_name gevonden`);
        return true;
    } catch (error) {
        console.error('❌ Fout bij ophalen reports:', error.message);
        return false;
    }
}

// Vervang de bestaande fetchReportsInBatches functie door deze verbeterde versie
async function fetchReportsInBatches() {
    console.log('📥 Ophalen van meldingen in batches...');
    let allFetched = false;
    let skip = 0;
    let totalReports = 0;
    reportsByFotoName = {};

    // Case-insensitive mapping voor betere matching
    reportsByFotoNameLowerCase = {};

    try {
        while (!allFetched) {
            const url = `${ODATA_URL}?$select=ID,foto_name&$top=${BATCH_SIZE}&$skip=${skip}`;
            console.log(`🔄 Ophalen batch: skip=${skip}, limit=${BATCH_SIZE}`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Reports ophalen mislukt: ${response.statusText}`);
            }

            const data = await response.json();

            // Debug: toon een paar records om de structuur te controleren
            if (skip === 0) {
                console.log("🔍 Voorbeeld API response:", data.value.slice(0, 2));
            }

            const reports = data.value || [];
            const batchSize = reports.length;

            reports.forEach(report => {
                if (report.foto_name) {
                    // Maak zowel een exacte als een case-insensitive mapping
                    reportsByFotoName[report.foto_name] = report.ID;
                    reportsByFotoNameLowerCase[report.foto_name.toLowerCase()] = report.ID;
                }
            });

            totalReports += batchSize;
            console.log(`✅ Batch verwerkt: ${batchSize} reports`);

            // Stop als we minder dan BATCH_SIZE reports hebben teruggekregen
            if (batchSize < BATCH_SIZE) {
                allFetched = true;
            } else {
                skip += BATCH_SIZE;
            }
        }

        console.log(`✅ Totaal ${totalReports} reports verwerkt, ${Object.keys(reportsByFotoName).length} met foto_name`);

        // Specificatie voor debugging: controleer of b1c4f3a7-3e42-4f52-bbfb-55ed4e9294af bestaat
        await debugReportById('b1c4f3a7-3e42-4f52-bbfb-55ed4e9294af');

        // Debug: Toon alle bekende foto_names
        console.log("🔍 Alle foto_name waarden:", Object.keys(reportsByFotoName));

        // Sla ook de case-insensitive mapping op zodat uploadFile deze kan gebruiken
        reportsByFotoNameLowerCase.reportsByFotoNameLowerCase = reportsByFotoNameLowerCase;

        return true;
    } catch (error) {
        console.error('❌ Fout bij ophalen reports:', error.message);
        return false;
    }
}

// Vervang de bestaande uploadFile functie door deze verbeterde versie
async function uploadFile(filePath) {
    const fileName = path.basename(filePath);
    console.log(`🔍 Zoeken naar match voor bestand: ${fileName}`);

    // Zoek report ID op basis van bestandsnaam, case-sensitive
    let reportId = reportsByFotoName[fileName];

    // Niet gevonden? Probeer case-insensitive
    if (!reportId) {
        const lowerFileName = fileName.toLowerCase();
        reportId = reportsByFotoNameLowerCase[lowerFileName];

        if (reportId) {
            console.log(`✅ Match gevonden met andere hoofdletters voor: ${fileName}`);
        }
    }

    // Nog steeds niet? Probeer zonder extensie (misschien staat de extensie niet in de DB)
    if (!reportId) {
        const fileNameWithoutExt = path.parse(fileName).name;
        for (const [dbFileName, id] of Object.entries(reportsByFotoName)) {
            if (dbFileName.includes(fileNameWithoutExt)) {
                reportId = id;
                console.log(`✅ Match gevonden op basis van bestandsnaam zonder extensie: ${fileNameWithoutExt}`);
                break;
            }
        }
    }

    if (!reportId) {
        console.error(`❌ Geen report gevonden met foto_name: ${fileName}`);
        moveFile(filePath, false);
        return false;
    }

    console.log(`📤 Bezig met uploaden van ${filePath} naar melding ${reportId}...`);

    const metadataUrl = `${ODATA_URL}/${reportId}/attachments`;
    console.log(`📄 Metadata URL: ${metadataUrl}`);

    function getMimeType(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                return 'image/jpeg';
            case '.png':
                return 'image/png';
            case '.webp':
                return 'image/webp';
            case '.heic':
                return 'image/heic';
            default:
                return 'application/octet-stream';
        }
    }

    try {
        const metadataResponse = await fetch(metadataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: fileName,
                note: `Automatisch opgeladen foto: ${fileName}`
            })
        });

        if (!metadataResponse.ok) {
            throw new Error(`Metadata aanmaken mislukt: ${metadataResponse.statusText}`);
        }

        const metadata = await metadataResponse.json();
        const attachmentId = metadata.ID;

        if (!attachmentId) {
            throw new Error('Kon geen attachment ID krijgen van de server');
        }

        const fileStream = fs.createReadStream(filePath);
        const contentUrl = `${metadataUrl}/${attachmentId}/content`;
        console.log(`📤 Uploaden naar: ${contentUrl}`);

        const mimeType = getMimeType(filePath);
        const uploadResponse = await fetch(contentUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': mimeType
            },
            body: fileStream
        });

        if (!uploadResponse.ok) {
            throw new Error(`Upload inhoud mislukt: ${uploadResponse.statusText}`);
        }

        console.log(`✅ Succes: ${fileName} gekoppeld aan melding ${reportId}`);
        moveFile(filePath, true);
        return true;
    } catch (error) {
        console.error(`❌ Fout bij uploaden ${filePath}:`, error.message);
        moveFile(filePath, false);
        return false;
    }
}

async function processFiles() {
    console.log(`📂 Scannen van de map: ${UPLOAD_FOLDER}`);
    ensureFoldersExist();

    // Eerst alle reports ophalen
    const reportsLoaded = await fetchReportsInBatches();
    if (!reportsLoaded) {
        console.error('❌ Kon geen reports ophalen. Upload geannuleerd.');
        return;
    }

    fs.readdir(UPLOAD_FOLDER, async (err, files) => {
        if (err) {
            console.error('❌ Fout bij het lezen van de map:', err);
            return;
        }

        console.log(`🔎 Gevonden bestanden: ${files.length}`);

        const imageFiles = files.filter(file =>
            SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
        );

        if (imageFiles.length === 0) {
            console.log('ℹ️ Geen bestanden gevonden om te uploaden.');
            return;
        }

        const batchesToProcess = Math.ceil(imageFiles.length / BATCH_SIZE);
        console.log(`📦 Verwerken in ${batchesToProcess} batch(es) van max ${BATCH_SIZE} bestanden`);

        for (let batch = 0; batch < batchesToProcess; batch++) {
            const startIdx = batch * BATCH_SIZE;
            const endIdx = Math.min(startIdx + BATCH_SIZE, imageFiles.length);
            const batchFiles = imageFiles.slice(startIdx, endIdx);

            console.log(`📊 Batch ${batch + 1}/${batchesToProcess}: ${batchFiles.length} bestanden`);

            for (const file of batchFiles) {
                const filePath = path.join(UPLOAD_FOLDER, file);
                await uploadFile(filePath);
            }

            console.log(`✅ Batch ${batch + 1} verwerkt.`);
        }

        console.log('✅ Alle bestanden verwerkt.');
    });
}

processFiles();