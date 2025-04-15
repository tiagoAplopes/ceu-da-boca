"use client";

import StartJourney from "@/components/shared/start-journey";

export default function Passo4Page() {
  return (
    <StartJourney
      title="Arcadas"
      description="Vamos passar agora para o exame dos dentes observando as arcadas superior e inferior."
      audioPath="/audios/04Arcadas.mp3"
      nextPath="/paciente/passo-5"
      previousPath="/paciente/passo-3"
      progressClassName="w-4/6"
      instructionList={[
        "Abra a boca o máximo que puder e observe seus dentes um por um.",
        "Fique atento à manchas mudanças de coloração quantidade alinhamento.",
        "Veja se tem restos de dentes, raizes quebradas, cavidades ou outras alterações."
      ]}
    />
  );
} 