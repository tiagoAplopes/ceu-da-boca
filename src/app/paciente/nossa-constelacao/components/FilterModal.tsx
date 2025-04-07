import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterValues) => void;
  onClearFilters: () => void;
}

interface FilterValues {
  nome: string;
  especialidadeId: string | '';
  cidade: string;
  estado: string;
  urgencia12h24h: boolean;
  clinicaGeralPrevencao: boolean;
}

interface Especialidade {
  id: string;
  nome: string;
}

export function FilterModal({ isOpen, onClose, onFilter, onClearFilters }: FilterModalProps) {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    nome: '',
    especialidadeId: '',
    cidade: '',
    estado: '',
    urgencia12h24h: true,
    clinicaGeralPrevencao: true
  });

  const estadosBrasil = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  useEffect(() => {
    fetch('/assets/mocks/especialidades.json')
      .then(res => res.json())
      .then(data => setEspecialidades(data))
      .catch(err => console.error('Erro ao carregar especialidades:', err));
  }, []);

  const handleFilter = () => {
    onFilter(filterValues);
    onClose();
  };

  const handleClearFilters = () => {
    setFilterValues({
      nome: '',
      especialidadeId: '',
      cidade: '',
      estado: '',
      urgencia12h24h: true,
      clinicaGeralPrevencao: true
    });
    onClearFilters();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Filtrar Profissionais</DialogTitle>
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Limpar filtros
            </button>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome do Profissional</Label>
            <Input
              id="nome"
              placeholder="Digite o nome"
              value={filterValues.nome}
              onChange={(e) => setFilterValues(prev => ({ ...prev, nome: e.target.value }))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="especialidade">Especialidade</Label>
            <Select 
              value={filterValues.especialidadeId} 
              onValueChange={(value) => setFilterValues(prev => ({ ...prev, especialidadeId: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todas as especialidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todas as especialidades</SelectItem>
                  {especialidades.map(esp => (
                    <SelectItem 
                      key={esp.id} 
                      value={esp.id}
                    >
                      {esp.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                placeholder="Digite a cidade"
                value={filterValues.cidade}
                onChange={(e) => setFilterValues(prev => ({ ...prev, cidade: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={filterValues.estado} onValueChange={(value) => setFilterValues(prev => ({ ...prev, estado: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Selecione</SelectItem>
                    {estadosBrasil.map(estado => (
                      <SelectItem 
                        key={estado.sigla} 
                        value={estado.sigla.toLowerCase()}
                      >
                        {estado.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgencia"
              checked={filterValues.urgencia12h24h}
              onCheckedChange={(checked) => 
                setFilterValues(prev => ({ ...prev, urgencia12h24h: checked as boolean }))
              }
            />
            <Label htmlFor="urgencia" className="text-sm">
              Urgência 12h e/ou 24h
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="clinica"
              checked={filterValues.clinicaGeralPrevencao}
              onCheckedChange={(checked) => 
                setFilterValues(prev => ({ ...prev, clinicaGeralPrevencao: checked as boolean }))
              }
            />
            <Label htmlFor="clinica" className="text-sm">
              Clínica Geral e/ou Prevenção
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleFilter}>
            Aplicar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}











