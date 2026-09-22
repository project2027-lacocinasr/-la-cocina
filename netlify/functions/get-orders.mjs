import { store, json, kitchenAuth } from "./lib/common.mjs";

export default async (req) => {
  if(!kitchenAuth(req)) return json({error:"Não autorizado"},401);
  if(req.method!=="GET") return json({error:"Method not allowed"},405);
  const {blobs}=await store("la-cocina-orders").list({prefix:"orders/"});
  const orders=await Promise.all(blobs.map(async b=>await store("la-cocina-orders").get(b.key,{type:"json"})));
  orders.sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));
  return json({orders:orders.slice(0,100)});
};
