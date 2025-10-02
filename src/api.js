const HOOK_URL = "https://hooks.zapier.com/hooks/catch/1888053/bgwofce/";

async function post(payload) {
  const res = await fetch(HOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
}

export function initSession(csid, iam = "Your Name") {
  return post({
    customerId: "dummy",
    action: "init",
    customerSessionId: csid,
    activityType: "LOGIN",
    uuid: "uuid-" + Date.now(),
    brand: "SD",
    solution: "ATO",
    iam,
  });
}

export function getScore(csid, iam = "Your Name") {
  return post({
    customerId: "dummy",
    action: "getScore",
    customerSessionId: csid,
    activityType: "MAKE_PAYMENT",
    uuid: "uuid-" + Date.now(),
    brand: "SD",
    solution: "ATO",
    iam,
  });
}
