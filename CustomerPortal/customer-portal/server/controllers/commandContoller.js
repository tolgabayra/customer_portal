const {exec} = require("child_process")
const env = require("../configs/config")
env.configenv


const runSoftwareExec = (req,res) => {
    const jeton_id = req.params.id 
    exec(process.env.YAZILIM_GUNCELLEME.replace('jeton_id', `${jeton_id}`), (error, stdout, stderr) => {
        if(error){
        console.log(`error: ${error.message}`);
        return error
        }
        if(stderr){
        console.log(`stderr: ${stderr}`);
        return stderr
        }
        console.log(`stdout: ${stdout}`);
        const file = (__dirname, 'tmp/abc.txt')

        res.status(200).download(file)
    })
}


const runLicenseExec = (req,res) => {
    const jeton_id = req.params.id
    exec(process.env.LISANS_GUNCELLEME.replace('jeton_id', `${jeton_id}`), (error, stdout, stderr) => {
        if(error){
        console.log(`error: ${error.message}`);
        return error
        }
        if(stderr){
        console.log(`stderr: ${stderr}`);
        return stderr
        }
        console.log(`stdout: ${stdout}`);
        const file = (__dirname, 'tmp/abx.txt')

        res.status(200).download(file)
    })
}

const runDatabaseExec = (req,res) => {
    const jeton_id = req.params.id
    exec(process.env.DATABASE_GUNCELLEME.replace('jeton_id', `${jeton_id}`), (error, stdout, stderr) => {
        if(error){
        console.log(`error: ${error.message}`);
        return error
        }
        if(stderr){
        console.log(`stderr: ${stderr}`);
        return stderr
        }
        console.log(`stdout: ${stdout}`);
        const file = (__dirname, 'tmp/aby.txt')

        res.status(200).download(file)
    })
}





module.exports = {
    runSoftwareExec,
    runLicenseExec,
    runDatabaseExec
}
