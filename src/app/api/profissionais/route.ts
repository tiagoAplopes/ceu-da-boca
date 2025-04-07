import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'mocks', 'profissionais.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      [
        {
          "id": "1",
          "nome": "Dr. João Silva",
          "foto": "https://randomuser.me/api/portraits/men/1.jpg",
          "latitude": -31.722998,
          "longitude": -52.358097,
          "especialidades": ["Clínico Geral", "Pediatria"],
          "urgencia": ["Emergência", "Consulta Regular"],
          "cidade": "Pelotas",
          "uf": "RS",
          "telefone": "5553999999999"
        }
      ],
      { status: 200 }
    );
  }
}
