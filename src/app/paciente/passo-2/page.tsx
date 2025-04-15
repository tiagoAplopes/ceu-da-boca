"use client";

import StartJourney from "@/components/shared/start-journey";

export default function Passo2Page() {
  return (
    <StartJourney
      title="Lábios"
      description="Agora vamos examinar os lábios superior e inferior"
      audioPath="/audios/02Labios.mp3"
      nextPath="/paciente/passo-3"
      previousPath="/paciente/passo-1"
      progressClassName="w-2/6"
      instructionList={[
        "Com os dedos polegares e indicadores apalpe os lábios.",
        "Puxe bem o lábio superior levantando-o e observe a sua mucosa.",
        "Faça o mesmo com o lábio inferior puxe bem e o abaixe-o.",
        "Fique atento à nódulos, áreas esbranquiçadas, avermelhadas ou enegrecidas e se há bolhas ou feridas."
      ]}
    />
  );
} 