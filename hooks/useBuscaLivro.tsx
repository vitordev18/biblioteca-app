import { useState } from 'react';

interface LivroEncontrado {
  titulo: string;
  autor: string;
}

export function useBuscaLivro() {
  const [query, setQuery] = useState('');
  const [resultado, setResultado] = useState<LivroEncontrado | null>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarLivro = async () => {
    const termoBusca = query.trim();

    if (termoBusca.length < 3) {
      setErro('Digite ao menos 3 caracteres para buscar.');
      setResultado(null);
      return;
    }

    setCarregando(true);
    setErro('');
    setResultado(null);

    try {
      const termoFormatado = encodeURIComponent(termoBusca);
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${termoFormatado}&limit=1`,
      );
      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setErro('Nenhum livro encontrado com esse título.');
      } else {
        const livro = data.docs[0];
        setResultado({
          titulo: livro.title ?? termoBusca,
          autor: livro.author_name?.[0] ?? 'Autor desconhecido',
        });
      }
    } catch {
      setErro('Erro ao buscar. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  const limpar = () => {
    setQuery('');
    setResultado(null);
    setErro('');
  };

  return { query, setQuery, resultado, erro, carregando, buscarLivro, limpar };
}
