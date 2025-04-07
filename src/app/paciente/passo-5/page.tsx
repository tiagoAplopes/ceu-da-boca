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
    />
  );
} 