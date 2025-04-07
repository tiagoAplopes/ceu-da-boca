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
    />
  );
} 