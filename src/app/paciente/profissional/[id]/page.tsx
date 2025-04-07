'use client'

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState, use } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Instagram, Star, Clock } from "lucide-react";
import Image from 'next/image';

interface Profissional {
  id: string;
  nome: string;
  foto: string;
  especialidades: string[];
  urgencia: string[];
  latitude: number;
  longitude: number;
  cidade: string;
  uf: string;
  telefone?: string;
  instagram?: string;
  avaliacao?: number;
  horarioAtendimento?: string;
  sobre?: string;
}

interface Usuario {
  nome: string;
  email: string;
}

export default function PerfilProfissional({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregar dados do profissional
        const responseProfissional = await fetch(`/api/profissionais/${resolvedParams.id}`);
        if (!responseProfissional.ok) throw new Error('Falha ao carregar dados do profissional');
        const dataProfissional = await responseProfissional.json();
        setProfissional(dataProfissional);

        // Carregar dados do usuário logado
        const responseUsuario = await fetch('/api/usuario');
        if (!responseUsuario.ok) throw new Error('Falha ao carregar dados do usuário');
        const dataUsuario = await responseUsuario.json();
        setUsuario(dataUsuario);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();
  }, [resolvedParams.id]);

  const handleWhatsApp = () => {
    if (!profissional?.telefone || !usuario?.nome) return;
    
    const message = encodeURIComponent(
      `Olá. Me chamo ${usuario.nome} e te encontrei no aplicativo *Céu da Boca*. Gostaria de marcar uma avaliação odontológica. Aguardo seu contato.`
    );
    
    window.open(
      `https://wa.me/${profissional.telefone}?text=${message}`,
      '_blank'
    );
  };

  const handleInstagram = () => {
    if (!profissional?.instagram) return;
    
    const instagramHandle = profissional.instagram.replace('@', '');
    window.open(`https://instagram.com/${instagramHandle}`, '_blank');
  };

  if (!isLoaded || !profissional) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#f1f1f1]">
        <div className="animate-pulse text-[#0368df]">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f1f1f1]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="relative flex items-center justify-center w-full text-[#0368df] font-semibold h-14">
          <Button 
            variant="ghost" 
            className="absolute left-2"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          Perfil do Dentista
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#0368df] to-[#1f51d1] rounded-t-3xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white mx-auto md:mx-0">
                  <img
                    src={profissional.foto || "/assets/img/robo-feliz.png"}
                    alt={profissional.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-xl md:text-2xl font-bold text-white">Dr(a). {profissional.nome}</h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 mt-1">
                    {Array.isArray(profissional.especialidades) && profissional.especialidades.map((esp: string, index: number) => (
                      <span key={index} className="text-sm text-white opacity-90">
                        {esp}
                        {index < profissional.especialidades.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-white opacity-90">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{profissional.cidade} - {profissional.uf}</span>
                  </div>
                </div>
              </div>

              {profissional.urgencia.length > 0 && (
                <div className="flex flex-col items-center md:items-end">
                  <h2 className="font-semibold text-white mb-2">Atendimentos</h2>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    {profissional.urgencia.map((urg, index) => (
                      <Badge key={index} variant="outline" className="border-white text-white">
                        {urg}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="p-4 md:p-6">
            <div className="w-full h-[300px] md:h-[400px]">
              <GoogleMap
                zoom={15}
                center={{
                  lat: profissional.latitude,
                  lng: profissional.longitude,
                }}
                mapContainerClassName="w-full h-full rounded-lg"
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                <Marker
                  position={{
                    lat: profissional.latitude,
                    lng: profissional.longitude,
                  }}
                  icon={{
                    url: profissional.foto || "/assets/img/robo-feliz.png",
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20, 20),
                  }}
                />
              </GoogleMap>
            </div>

            {/* Profile Info Section */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start justify-between">
                {profissional.avaliacao && (
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{profissional.avaliacao}</span>
                  </div>
                )}
              </div>

              {profissional.horarioAtendimento && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{profissional.horarioAtendimento}</span>
                </div>
              )}

              {profissional.sobre && (
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">Sobre</h2>
                  <p className="text-gray-600 text-sm">{profissional.sobre}</p>
                </div>
              )}

              {/* Contact Buttons */}
              <div className="mt-6 space-y-3">
                {profissional?.telefone && (
                  <Button 
                    className="w-full h-12 text-white font-bold text-lg bg-[#25D366] hover:bg-[#1ea855] gap-2"
                    onClick={handleWhatsApp}
                    disabled={!usuario}
                  >
                    <Image 
                      src="/whatsapp.svg"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="text-white"
                    />
                    Marcar Consulta
                  </Button>
                )}
                
                {profissional?.instagram && (
                  <Button
                    variant="outline"
                    className="w-full h-12 font-semibold gap-2"
                    onClick={handleInstagram}
                  >
                    <Instagram className="h-5 w-5" />
                    Ver Instagram
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


