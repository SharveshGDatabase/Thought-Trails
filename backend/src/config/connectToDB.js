<<<<<<< HEAD
import mongoose from 'mongoose'

function ensureDbName(url, defaultDb='thought_trails'){
    if(!url) return url;
    const trimmed = url.replace(/^'+|'+$/g, '').trim();
    // If URL already contains a database name (e.g., /mydb or /mydb?...) return as-is
    if(/\/[^/?]+/.test(trimmed)) return trimmed;
    // Split query params, append default db name before params
    const [base, params] = trimmed.split('?');
    const newBase = base.endsWith('/') ? `${base}${defaultDb}` : `${base}/${defaultDb}`;
    return params ? `${newBase}?${params}` : newBase;
}

export const ConnectToDB = async()=>{
    try{
        const rawUrl = process.env.MONGODB_URL;
        const finalUrl = ensureDbName(rawUrl);
        const dbNameMatch = finalUrl ? finalUrl.match(/\/([^/?]+)(\?|$)/) : null;
        const dbName = dbNameMatch ? dbNameMatch[1] : 'not-specified (using default)';

        console.log(`Connecting to MongoDB database: ${dbName}`);
        await mongoose.connect(finalUrl);
        console.log("DataBase Connected Successfully")
        console.log('Mongoose connection state:', mongoose.connection.readyState)
    }
    catch(err){
        console.error("Something Went Wrong While Connecting To DB", err.message)
        throw err;
=======
import mongoose, { mongo } from 'mongoose'


export const ConnectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DataBase Connected Successfully")
    }
    catch(err){
        console.log("Something Went Wrong While Connecting To DB")
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6
    }
}