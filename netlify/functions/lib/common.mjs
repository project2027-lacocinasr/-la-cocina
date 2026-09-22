import { getStore } from "@netlify/blobs";

export function json(data,status=200){
  return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
}

export async function readBody(req){
  try{return await req.json();}catch{return null;}
}

export function kitchenAuth(req){
  const expected=process.env.KITCHEN_PIN;
  if(!expected) return false;
  return (req.headers.get("x-kitchen-pin")||"")===expected;
}

export function store(name){return getStore(name);}
