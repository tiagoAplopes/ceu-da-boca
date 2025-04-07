import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'mocks', 'profissionais.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const profissionais = JSON.parse(fileContents);
    
    const profissional = profissionais.find((p: any) => p.id === params.id);
    
    if (!profissional) {
      return NextResponse.json(
        { error: 'Profissional não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(profissional);
  } catch (error) {
    // Fallback para dados mockados em caso de erro
    const fallbackData = {
      "id": params.id,
      "nome": "Dr. João Silva",
      "foto": "https://randomuser.me/api/portraits/men/1.jpg",
      "latitude": -31.722998,
      "longitude": -52.358097,
      "especialidades": [
        { "id": "1", "nome": "Clínico Geral" },
        { "id": "2", "nome": "Pediatria" }
      ],
      "urgencias": [
        { "id": "1", "nome": "Emergência" },
        { "id": "2", "nome": "Consulta Regular" }
      ],
      "telefone": "5553999999999",
      "instagram": "@drjoaosilva"
    };

    return NextResponse.json(fallbackData);
  }
}