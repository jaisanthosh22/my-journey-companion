export const processAI = (input: string, actions: any) => {
  const text = input.toLowerCase();

  if (text.includes("sos")) {
    actions.sendSOS();
    return { reply: "SOS has been sent." };
  }

  if (text.includes("call")) {
    actions.makeCall();
    return { reply: "Calling emergency services." };
  }

  if (text.includes("taxi")) {
    actions.showTaxis();
    return { reply: "Showing nearby taxis." };
  }

  if (text.includes("safety")) {
    const score = actions.predictSafety();
    return { reply: `Safety level is ${score} percent.` };
  }

  return { reply: "I am here with you." };
};