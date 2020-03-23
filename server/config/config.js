// run port

process.env.PORT = process.env.PORT || 3000;


// run BD

process.env.URLDB  = process.env.URLDB || 'mongodb://localhost:27017/no-author';



// SEED TOKEN 
process.env.SEED = process.env.SEED || 'secret-token-pass';


// expire token
process.env.EXP = '48h';