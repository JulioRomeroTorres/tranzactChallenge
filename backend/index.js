import app from './app.js'

const main = ()=>{
    app.listen( app.get("port"), ()=> console.log(`Backend server is listennig in port ${app.get("port")}`)  );
};

main();