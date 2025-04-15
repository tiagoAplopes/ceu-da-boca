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
      instructionList={[
        "Coloque o dedo polegar e o dedo indicador na bochecha.",
        "Deixe o polegar para fora e o indicador para dentro e comece a apalpar as suas bochechas.",
        "Puxe uma bochecha para o lado, uma de cada vez, afastando os dentes para poder observar a região interna.",
        "Olhe para a mucosa da bochecha, apos olhar de um lado, faca o mesmo do outro.",
        "Fique atento para areas esbranquiçadas, avermelhadas e enegrecidas; Observer se ha feridas ou nódulos."
      ]}
    />
  );
} 