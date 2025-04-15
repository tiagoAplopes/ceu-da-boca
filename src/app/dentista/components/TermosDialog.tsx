import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface TermosDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermosDialog({ isOpen, onClose }: TermosDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-6 space-y-6">
        <DialogTitle className="sr-only">Termos e Condições de Uso</DialogTitle>

        {/* Título */}
        <div className="text-center space-y-4 pt-4">
          <h1 className="text-2xl font-bold text-blue-600">
            TERMOS E CONDIÇÕES DE USO
          </h1>
          <p className="text-gray-600 font-semibold">
            TERMOS E CONDIÇÕES GERAIS DE USO E DE COMPRA E VENDA DO APLICATIVO
            "CÉU DA BOCA"
          </p>
        </div>

        {/* Conteúdo dos Termos */}
        <div className="space-y-4 text-gray-700 max-h-[60vh] overflow-y-auto pr-2">
          {/* Adicione aqui o conteúdo dos termos */}
          <p>
            Estes termos e condições gerais de uso e de compra e venda
            aplicam-se aos serviços prestados pela pessoa jurídica [NOME
            EMPRESARIAL], devidamente registrada sob o CNPJ n°
            [00.000.000/0000-00]...
          </p>

          <h2 className="text-lg font-semibold text-blue-600 mt-6">
            5. DISPOSIÇÕES FINAIS
          </h2>
          <p>
            5.1. Estes Termos e Condições poderão ser atualizados a qualquer
            momento, sendo a versão mais recente sempre disponibilizada em nosso
            aplicativo.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
