"use client";

import StartJourney from "@/components/shared/start-journey";

export default function Passo5Page() {
  return (
    <StartJourney
      title="Língua"
      description="Agora vamos examinar a língua. Para isso você vai precisar de uma toalha ou um pedaço de gaze para lhe ajudar, pois a língua escorrega ao puxar."
      audioPath="/audios/05Lingua.mp3"
      nextPath="/paciente/passo-6"
      previousPath="/paciente/passo-4"
      progressClassName="w-5/6"
      instructionList={[
        "Puxe a língua para o lado esquerdo e direito e observe a sua lateral.",
        "Agora pode soltar. Olhe a língua por cima onde estão as papilas gustativas e depois por baixo local onde chamamos de assoalho lingual.",
        "Fique atento a mudanças de coloração feridas ou bolhas."
      ]}
    />
  );
} 