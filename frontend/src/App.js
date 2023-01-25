import { useEffect, useState } from 'react';
import './App.css';
import Form from './Form';
import Table from './Table';

function App() {

  //Objeto produto
  const produto = {
    codigo: 0,
    name: '',
    brand: ''
  };

  //UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido))
  }, []);

  //Obtendo dados do form
  const onTyping = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  //Cadastrar produto
  const cadastrar = () => {
    fetch("http://localhost:8080/api/products", {
      method: 'POST',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      setProdutos([...produtos, retorno_convertido])
      alert('Produto cadastrado com sucesso!')
      limpar();
    })
  }

  //limpar formulario
  const limpar = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //selecionar produto
  const selecionarProduto = (index) => {
    setObjProduto(produtos[index]);
    setBtnCadastrar(false);
  }

  //Remover produto
  const remover = () => {
    fetch("http://localhost:8080/api/products/"+objProduto.codigo, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      alert('Produto removido com sucesso!');
      
      let vetorTemp = [...produtos];

      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });

      vetorTemp.splice(indice, 1);

      setProdutos(vetorTemp);

      limpar();
    })
  }

  //alterar
  const alterar = () => {
    fetch("http://localhost:8080/api/products/edit/"+objProduto.codigo, {
      method: 'PUT',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      alert('Produto atualizado com sucesso!')
   
      let vetorTemp = [...produtos];

      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });

      vetorTemp[indice] = objProduto;

      setProdutos(vetorTemp);

      limpar();
    })
  }



  //Main
  return (
    <div>
      <Form botao={btnCadastrar} eventoTeclado = {onTyping} cadastrar = {cadastrar} obj = {objProduto} cancelar={limpar} remover={remover} alterar={alterar}/>
      <Table produtos={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
