"use client";

import StartJourney from "@/components/shared/start-journey";

export default function Passo3Page() {
  return (
    <StartJourney
      title="Bochechas"
      description="Agora vamos fazer o autoexame das bochechas"
      audioPath="/audios/03Bochecha.mp3"
      nextPath="/paciente/passo-4"
      previousPath="/paciente/passo-2"
      progressClassName="w-3/6"
    />
  );
} 