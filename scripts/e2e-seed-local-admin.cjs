/* eslint @typescript-eslint/no-require-imports: "off" */
const { randomBytes,scryptSync } = require("node:crypto");
const postgres = require("postgres");
const password=process.env.E2E_LOCAL_PASSWORD;
if(!password)throw new Error("E2E_LOCAL_PASSWORD required");
const salt=randomBytes(32).toString("hex");
const passwordHash=scryptSync(password,Buffer.from(salt,"hex"),64,{maxmem:64*1024*1024}).toString("hex");
const now=new Date().toISOString();
const data={id:"admin",username:"admin",name:"Administrateur TLC",salt,passwordHash,
  version:1,mustChange:true,createdAt:now,updatedAt:now};
(async()=>{
  const sql=postgres(process.env.DATABASE_URL);
  try{
    await sql`INSERT INTO records(collection,id,data)
      VALUES ('staff_local_credentials','admin',${sql.json(data)})`;
    console.log("E2E local administrator account seeded with hashed password");
  }finally{await sql.end();}
})().catch(error=>{console.error(error);process.exitCode=1;});
