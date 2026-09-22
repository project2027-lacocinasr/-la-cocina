import { store, json, kitchenAuth } from "./lib/common.mjs";

export default async (req) => {
  if(!kitchenAuth(req)) return json({error:"Não autorizado"},401);
  if(req.method!=="GET") return json({error:"Method not allowed"},405);
  const {blobs}=await store("la-cocina-reservations").list({prefix:"reservations/"});
  const reservations=await Promise.all(blobs.map(async b=>await store("la-cocina-reservations").get(b.key,{type:"json"})));
  reservations.sort((a,b)=>new Date((a.date||"9999-12-31")+"T"+(a.time||""))-new Date((b.date||"9999-12-31")+"T"+(b.time||"")));
  return json({reservations:reservations.slice(0,200)});
};
