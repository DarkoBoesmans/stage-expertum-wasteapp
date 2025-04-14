// MS Azure on PUT block blob operation, supports, only 256 MB max size file on a single HTTP request (PUT API). To support blob sizes of more than 256 MB, Azure suggests uploadingto upload the blobs in chunks of 256 MB and then call PUT Block List to combine all chunks as single blob (kind of multipart scenario).

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

const UPLOAD_FOLDER = './assets/todo';
const DONE_FOLDER = './assets/done';
const ERROR_FOLDER = './assets/error';
const BATCH_SIZE = 10;

const STORAGE_URL = 'http://localhost:4004/storage/files';
const REPORTS_URL = 'http://localhost:4004/waste/DumpingReports';
const SUPPORTED_FORMATS = ['.webp', '.heic', '.png', '.jpg', '.jpeg'];

// Map om foto_name naar report ID te linken
let reportsByFotoName = {};

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

// Nieuwe functie: Haal reports op in batches
async function fetchReportsInBatches() {
    console.log('📥 Ophalen van meldingen in batches...');
    let allFetched = false;
    let skip = 0;
    let totalReports = 0;
    reportsByFotoName = {};

    try {
        while (!allFetched) {
            const url = `${REPORTS_URL}?$select=ID,foto_name&$top=${BATCH_SIZE}&$skip=${skip}`;
            console.log(`🔄 Ophalen batch: skip=${skip}, limit=${BATCH_SIZE}`);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Reports ophalen mislukt: ${response.statusText}`);
            }
            
            const data = await response.json();
            const reports = data.value || [];
            const batchSize = reports.length;
            
            reports.forEach(report => {
                if (report.foto_name) {
                    reportsByFotoName[report.foto_name] = report.ID;
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
        return true;
    } catch (error) {
        console.error('❌ Fout bij ophalen reports:', error.message);
        return false;
    }
}

async function uploadToStorage(filePath) {
    const fileName = path.basename(filePath);
    
    // Zoek report ID op basis van bestandsnaam
    const reportId = reportsByFotoName[fileName];
    
    if (!reportId) {
        console.log(`ℹ️ Geen report gevonden met foto_name: ${fileName}. Upload zonder koppeling.`);
    } else {
        console.log(`🔄 Bestand ${fileName} wordt gekoppeld aan report ID: ${reportId}`);
    }
    
    console.log(`📤 Bezig met uploaden van ${filePath} naar object storage...`);

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
        const fileContent = fs.readFileSync(filePath);
        const mimeType = getMimeType(filePath);

        const formData = new FormData();
        formData.append('file', fileContent, {
            contentType: mimeType,
            filename: fileName
        });
        
        // Als er een report ID is gevonden, voeg deze toe aan de formData
        if (reportId) {
            formData.append('reportId', reportId);
        }

        const uploadResponse = await fetch(STORAGE_URL, {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error(`Upload mislukt: ${uploadResponse.statusText}`);
        }

        // Haal de response data op
        const responseData = await uploadResponse.json();
        console.log(`✅ Succes: ${fileName} geüpload naar object storage`);
        
        // Als er een report ID is, update het report met de file info
        if (reportId) {
            await updateReportWithFileInfo(reportId, responseData.url, fileName);
        }
        
        moveFile(filePath, true);
        return true;
    } catch (error) {
        console.error(`❌ Fout bij uploaden ${filePath}:`, error.message);
        moveFile(filePath, false);
        return false;
    }
}

// Nieuwe functie: Update report met bestandsinformatie
async function updateReportWithFileInfo(reportId, fileUrl, fileName) {
    try {
        console.log(`📝 Report ${reportId} wordt bijgewerkt met bestandsgegevens...`);
        
        const response = await fetch(`${REPORTS_URL}/${reportId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                foto_url: fileUrl,
                foto_name: fileName
            })
        });
        
        if (!response.ok) {
            throw new Error(`Update report mislukt: ${response.statusText}`);
        }
        
        console.log(`✅ Report ${reportId} bijgewerkt met bestandsgegevens`);
        return true;
    } catch (error) {
        console.error(`❌ Fout bij bijwerken report ${reportId}:`, error.message);
        return false;
    }
}

async function processFiles() {
    console.log(`📂 Scannen van de map: ${UPLOAD_FOLDER}`);
    ensureFoldersExist();
    
    // Eerst alle reports ophalen
    const reportsLoaded = await fetchReportsInBatches();
    if (!reportsLoaded) {
        console.warn('⚠️ Kon geen reports ophalen. Bestanden worden geüpload zonder koppeling.');
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
                console.log(`📤 Uploaden: ${file}`);
                await uploadToStorage(filePath);
            }

            console.log(`✅ Batch ${batch + 1} verwerkt.`);
        }

        console.log('✅ Alle bestanden verwerkt.');
    });
}

processFiles();