"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Search, ChevronLeft, MapPin } from "lucide-react";
import { FilterModal } from "./components/FilterModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Profissional {
  id: string;
  nome: string;
  foto: string;
  latitude: number;
  longitude: number;
  especialidades: string[];
  urgencia: string[];
  cidade: string;
  uf: string;
}

// Dados fallback para caso de erro
const defaultData: Profissional[] = [
  {
    id: "1",
    nome: "Dr. João Silva",
    foto: "https://randomuser.me/api/portraits/men/1.jpg",
    latitude: -31.722998,
    longitude: -52.358097,
    especialidades: ["Clínico Geral", "Pediatria"],
    urgencia: ["Emergência", "Consulta Regular"],
    cidade: "Pelotas",
    uf: "RS",
  },
];

export default function NossaConstelacao() {
  const router = useRouter();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [allProfissionais, setAllProfissionais] =
    useState<Profissional[]>(defaultData);
  const [profissionais, setProfissionais] =
    useState<Profissional[]>(defaultData);
  const [selectedProfissional, setSelectedProfissional] = useState<
    string | null
  >(null);
  const [center, setCenter] = useState({
    lat: -31.720998973000878,
    lng: -52.35809723173391,
  });
  const [distancia, setDistancia] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState({
    lat: -31.720998973000878,
    lng: -52.35809723173391,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    // Carregar dados dos profissionais
    fetch("/api/profissionais")
      .then((response) => response.json())
      .then((data) => {
        setAllProfissionais(data);
        setProfissionais(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar profissionais:", error);
        // Em caso de erro, usa os dados padrão (defaultData)
        setAllProfissionais(defaultData);
        setProfissionais(defaultData);
      });

    // Obter localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    }
  }, []); // Execute apenas uma vez ao montar o componente

  const calcularDistancia = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Raio da Terra em km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distância em km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const formatarDistancia = (distancia: number): string => {
    if (distancia < 1) {
      return `${Math.round(distancia * 1000)} metros`;
    }
    return `${distancia.toFixed(1)} km`;
  };

  const handleVerPerfil = (id: string) => {
    router.push(`/paciente/profissional/${id}`);
  };

  const redirecionarParaLocalizacao = (profissional: Profissional) => {
    setSelectedProfissional(profissional.id);
    setCenter({
      lat: profissional.latitude,
      lng: profissional.longitude,
    });

    // Calcular e definir a distância
    const dist = calcularDistancia(
      userLocation.lat,
      userLocation.lng,
      profissional.latitude,
      profissional.longitude
    );
    setDistancia(formatarDistancia(dist));
  };

  const handleFilter = (filters: any) => {
    const filteredProfissionais = allProfissionais.filter((profissional) => {
      const filtroNome =
        !filters.nome ||
        profissional.nome.toLowerCase().includes(filters.nome.toLowerCase());
      const filtroEstado =
        !filters.estado ||
        profissional.uf.toLowerCase() === filters.estado.toLowerCase();
      const filtroCidade =
        !filters.cidade ||
        profissional.cidade
          .toLowerCase()
          .includes(filters.cidade.toLowerCase());
      const filtroEspecialidade =
        !filters.especialidadeId ||
        profissional.especialidades.includes(filters.especialidadeId);
      const filtroClinicaGeral =
        (profissional.especialidades || []).includes("Clínico Geral") ===
        filters.clinicaGeralPrevencao;
      const isUrgencia =
        profissional.urgencia && profissional.urgencia.length > 0;
      const filtroUrgencia = isUrgencia === filters.urgencia12h24h;

      return (
        filtroNome &&
        filtroEstado &&
        filtroCidade &&
        filtroEspecialidade &&
        filtroClinicaGeral &&
        filtroUrgencia
      );
    });

    setProfissionais(filteredProfissionais);
  };

  const handleClearFilters = () => {
    setProfissionais(allProfissionais);
  };

  if (!isLoaded) return <div>Carregando...</div>;

  return (
    <div className="relative h-screen w-screen">
      {/* Barra superior com botão de voltar e pesquisa */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex flex-col gap-3 z-50 w-[95vw] px-2">
        <div className="flex gap-3">
          <Link href="/paciente/passo-7">
            <Button variant="ghost" className="text-blue-600 cursor-pointer">
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
          <Button
            variant="secondary"
            className="pl-4 py-2 rounded-lg flex items-center gap-2 flex-1"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              Pesquisa com filtro
            </span>
          </Button>
        </div>

        {/* Card de distância reposicionado */}
        {selectedProfissional && distancia && (
          <div className="bg-white rounded-lg px-4 py-2 shadow-lg self-end">
            <p className="text-sm text-gray-600">Distância:</p>
            <p className="text-lg font-semibold text-blue-600">{distancia}</p>
          </div>
        )}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Mapa */}
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="w-full h-full"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          position={center}
          icon={{
            url: "/assets/icon/current-location.png",
            scaledSize: new google.maps.Size(30, 30),
          }}
        />

        {profissionais.map((profissional) => (
          <Marker
            key={profissional.id}
            position={{
              lat: profissional.latitude,
              lng: profissional.longitude,
            }}
            icon={{
              url: profissional.foto || "/assets/img/robo-feliz.png",
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20),
            }}
            onClick={() => redirecionarParaLocalizacao(profissional)}
          />
        ))}
      </GoogleMap>

      {/* Lista de profissionais */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-lg max-h-[35vh]">
        <div className="p-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

          {/* Container principal */}
          <div>
            {/* Container de rolagem */}
            <div className="overflow-x-auto overflow-y-hidden">
              {/* Container flex para os cards */}
              <div className="flex gap-3 pb-4 min-w-min">
                {profissionais.map((profissional) => (
                  <div
                    key={profissional.id}
                    className={`
                      flex-shrink-0 flex items-center gap-3 p-3
                      rounded-xl transition-all duration-200 cursor-pointer
                      w-[280px]
                      ${
                        selectedProfissional === profissional.id
                          ? "bg-gray-100 border-2 border-blue-500"
                          : "bg-white hover:bg-gray-50 border border-gray-100"
                      }
                    `}
                    onClick={() => redirecionarParaLocalizacao(profissional)}
                  >
                    {/* Imagem do profissional */}
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-14 h-14 rounded-full object-cover"
                        src={profissional.foto || "/assets/img/robo-feliz.png"}
                        alt={profissional.nome}
                      />
                      {selectedProfissional === profissional.id && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                          <MapPin className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Informações do profissional */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                        {profissional.nome}
                      </h3>

                      <div className="mt-0.5 space-y-0.5">
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {profissional.especialidades.join(", ")}
                        </p>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">
                            {profissional.cidade} - {profissional.uf}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="mt-1.5 w-full bg-blue-600 hover:bg-blue-700 text-xs h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerPerfil(profissional.id);
                        }}
                      >
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
