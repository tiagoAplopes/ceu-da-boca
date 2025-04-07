"use client";

import StartJourney from "@/components/shared/start-journey";

export default function Passo1Page() {
  return (
    <StartJourney 
      title="Céu da boca"
      description="E para finalizar a área a ser examinada agora é o céu da boca."
      audioPath="/audios/06Ceu_da_boca.mp3"
      nextPath="/paciente/passo-7"
      previousPath="/paciente/passo-5"
      progressClassName="w-6/6"
    />
  );
} 
