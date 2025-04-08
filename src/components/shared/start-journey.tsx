"use client";

import { Button } from "@/components/ui/button";
import { useCameraStore } from "@/store/camera-store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface StartJourneyProps {
  title: string;
  description: string;
  audioPath: string;
  nextPath: string;
  previousPath?: string;
  progressClassName?: string;
}

export default function StartJourney({
  title = "Pescoço",
  description = "Olá! Vamos começar nossa jornada! Iniciaremos o auto exame bucal pela área do pescoço.",
  audioPath = "/audios/01Pescoco.mp3",
  nextPath = "/paciente/passo-1",
  previousPath = "/paciente/comecar-jornada",
  progressClassName = "w-1/6",
}: StartJourneyProps) {
  const { showCamera, setShowCamera } = useCameraStore();
  const [showInstructions, setShowInstructions] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setShowCamera(false);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
      if (showCamera && mounted) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
          });

          if (videoRef.current && mounted) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
        } catch (err) {
          console.error("Erro ao inicializar câmera:", err);
          if (mounted) {
            setShowCamera(false);
          }
        }
      }
    };

    initCamera();

    return () => {
      mounted = false;
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [showCamera]);

  const startCamera = async () => {
    setShowCamera(true);
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);

    if (navigator.mediaDevices && "getUserMedia" in navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(() => {});
    }
  };

  // Componente de áudio que será reutilizado
  const AudioPlayer = () => (
    <div
      className={`rounded-lg p-4 ${
        showCamera
          ? "fixed bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent lg:left-0 lg:w-[40%] z-20"
          : ""
      }`}
    >
      <h3 className="text-center mb-2 font-medium text-white">
        Escute o passo a passo
      </h3>
      <audio ref={audioRef} controls className="w-full">
        <source src={audioPath} type="audio/mpeg" />
      </audio>
    </div>
  );

  return (
    <main className="min-h-screen bg-white flex flex-row">
      <div
        className={`${
          showCamera ? "w-[40%] h-screen overflow-hidden" : "w-full"
        } transition-all duration-300`}
      >
        <ScrollArea className={`${showCamera ? "h-screen" : "h-full"}`}>
          <div className="w-full flex flex-col items-center p-2 md:p-4">
            <div className="w-full max-w-2xl">
              {/* Header - Mesma largura do card */}
              <div className="flex items-center justify-between w-full mb-4">
                <Link href="/paciente/comecar-jornada">
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:bg-blue-50 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </Button>
                </Link>
                <h1 className="text-blue-600 text-xl font-medium">Jornada</h1>
                <div className="flex gap-2">
                  <Link href="/paciente/home">
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:bg-blue-50 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Content Card */}
              <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-500 p-6 shadow-lg md:h-auto min-h-[calc(100vh-100px)] md:min-h-0 flex flex-col">
                {/* Progress Bar */}
                <div className="w-full bg-white/20 h-2 rounded-full mb-8">
                  <div
                    className={`bg-white h-full rounded-full transition-all duration-300 ${progressClassName}`}
                  ></div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="text-white">
                    <h2 className="text-xl font-medium mb-2">{title}</h2>
                    <p>{description}</p>
                  </div>

                  {/* Audio Player */}
                  {!showCamera && <AudioPlayer />}

                  {/* Camera Button */}
                  <Button
                    className="w-full bg-white hover:bg-white/90 text-blue-600 flex items-center gap-2 cursor-pointer mb-4"
                    onClick={() => {
                      console.log("Botão clicado");
                      startCamera();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    Ative a câmera para te auxiliar
                  </Button>

                  {/* Instructions Section */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-blue-500 text-white px-8 hover:bg-blue-600 cursor-pointer justify-between"
                      onClick={() => setShowInstructions(!showInstructions)}
                    >
                      Instruções em texto
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transform transition-transform ${
                          showInstructions ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </Button>

                    {/* Instructions Cards */}
                    {showInstructions && (
                      <div className="overflow-x-auto">
                        <div
                          className={`flex gap-4 py-4 px-2 -mx-2 ${
                            showCamera ? "lg:flex-col" : ""
                          }`}
                        >
                          <div
                            className={`flex-none ${
                              showCamera ? "lg:w-full" : "w-[280px]"
                            }`}
                          >
                            <div className="bg-white rounded-lg p-4 shadow-lg h-32">
                              <p className="text-gray-800">
                                Apalpe com as pontas dos dedos das duas mãos a
                                área do seu pescoço.
                              </p>
                            </div>
                          </div>

                          <div
                            className={`flex-none ${
                              showCamera ? "lg:w-full" : "w-[280px]"
                            }`}
                          >
                            <div className="bg-white rounded-lg p-4 shadow-lg h-32">
                              <p className="text-gray-800">
                                Comece pela base e vá subindo. Chegue com os
                                dedos lá atrás do pescoço e apalpe mais um pouco
                              </p>
                            </div>
                          </div>

                          <div
                            className={`flex-none ${
                              showCamera ? "lg:w-full" : "w-[280px]"
                            }`}
                          >
                            <div className="bg-white rounded-lg p-4 shadow-lg h-32">
                              <p className="text-gray-800">
                                Retorne passando pela área próxima a orelha e
                                pela base da mandíbula.
                              </p>
                            </div>
                          </div>

                          <div
                            className={`flex-none ${
                              showCamera ? "lg:w-full" : "w-[280px]"
                            }`}
                          >
                            <div className="bg-white rounded-lg p-4 shadow-lg h-32">
                              <p className="text-gray-800">
                                Desça novamente, a região do pescoço é lisa
                                fique atento se encontrar algum nódulo.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons - Agora no final do flex container */}
                <div className="flex gap-4 justify-between mt-6">
                  <Link href={previousPath}>
                    <Button className="bg-white text-blue-600 px-8 cursor-pointer hover:bg-white/90 hover:text-blue-700">
                      Voltar
                    </Button>
                  </Link>

                  <Link href={nextPath}>
                    <Button className="bg-white text-blue-600 px-8 cursor-pointer  hover:bg-white/90 hover:text-blue-700">
                      Próximo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {showCamera && (
        <div
          className={`fixed top-0 right-0 bg-black flex flex-col h-screen
          lg:w-[60%] w-full`}
        >
          {/* Header e Progress Bar - Só aparece em mobile */}
          <div className="lg:hidden p-4 bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0 w-full z-10">
            <div className="flex items-center justify-between w-full mb-4">
              <Link href="/paciente/comecar-jornada">
                <Button variant="ghost" className="text-white cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </Button>
              </Link>
              <h1 className="text-white text-xl font-medium">Jornada</h1>
              <div className="flex gap-2">
                <Link href="/paciente/home">
                  <Button variant="ghost" className="text-white cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </Button>
                </Link>
                <Button
                  onClick={stopCamera}
                  variant="ghost"
                  className="text-white cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="w-full bg-white/20 h-2 rounded-full mb-4">
              <div className="w-1/4 bg-white h-full rounded-full"></div>
            </div>

            {/* Texto explicativo */}
            <div className="text-white">
              <h2 className="text-xl font-medium mb-2">{title}</h2>
              <p>{description}</p>
            </div>
          </div>

          {/* Botão de fechar câmera - Só aparece em desktop */}
          <Button
            onClick={stopCamera}
            className="lg:block hidden absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white z-10"
          >
            Fechar Câmera
          </Button>

          {/* Camera View */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-contain"
          />

          {/* Audio Player será renderizado aqui quando a câmera estiver ativa */}
          <AudioPlayer />

          {/* Bottom Controls - Só aparece em mobile */}
          <div className="lg:hidden absolute bottom-[100px] left-0 w-full bg-gradient-to-t from-black/50 to-transparent p-4">
            <div className="flex gap-4 justify-between">
              <Link href={previousPath}>
                <Button className="bg-blue-500 text-white px-8 hover:bg-blue-600 cursor-pointer">
                  VOLTAR
                </Button>
              </Link>

              <Link href={nextPath}>
                <Button className="bg-blue-500 text-white px-8 hover:bg-blue-600 cursor-pointer">
                  PRÓXIMO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
