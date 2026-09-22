import { store, json, readBody } from "./lib/common.mjs";

export default async (req) => {
  if(req.method!=="POST") return json({error:"Method not allowed"},405);
  const data=await readBody(req);
  if(!data?.customer?.name || !data?.customer?.phone || !Array.isArray(data.items) || !data.items.length) return json({error:"Pedido inválido"},400);
  const id=crypto.randomUUID();
  const order={...data,id,createdAt:data.createdAt||new Date().toISOString()};
  await store("la-cocina-orders").setJSON(`orders/${id}`,order);
  return json({ok:true,id});
};
