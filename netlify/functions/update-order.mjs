import { store, json, readBody, kitchenAuth } from "./lib/common.mjs";

export default async (req) => {
  if(!kitchenAuth(req)) return json({error:"Não autorizado"},401);
  if(req.method!=="POST") return json({error:"Method not allowed"},405);
  const data=await readBody(req);
  if(!data?.id || !data?.status) return json({error:"Dados inválidos"},400);
  const s=store("la-cocina-orders");
  const key=`orders/${data.id}`;
  const existing=await s.get(key,{type:"json"});
  if(!existing) return json({error:"Pedido não encontrado"},404);
  const updated={...existing,status:data.status,updatedAt:new Date().toISOString()};
  await s.setJSON(key,updated);
  return json({ok:true,order:updated});
};
