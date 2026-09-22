import { store, json, readBody } from "./lib/common.mjs";

export default async (req) => {
  if(req.method!=="POST") return json({error:"Method not allowed"},405);
  const data=await readBody(req);
  if(!data?.name || !data?.phone || !data?.date || !data?.time || !data?.people) return json({error:"Reserva inválida"},400);
  const id=crypto.randomUUID();
  const reservation={...data,id,status:data.status||"Aguardando",createdAt:data.createdAt||new Date().toISOString()};
  await store("la-cocina-reservations").setJSON(`reservations/${id}`,reservation);
  return json({ok:true,id});
};
