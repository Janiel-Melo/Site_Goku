  function getCarrinho() {
            const carrinhoJSON = localStorage.getItem('carrinhoDBZ');
            return carrinhoJSON ? JSON.parse(carrinhoJSON) : [];
        }

        function salvarCarrinho(carrinho) {
            localStorage.setItem('carrinhoDBZ', JSON.stringify(carrinho));
            updateCarrinhoCount(carrinho);
        }

        function updateCarrinhoCount(carrinho) {
            const countElement = document.getElementById('carrinho-count');
            if (countElement) {

                const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
                countElement.textContent = totalItens;
            }
        }
        function adicionarAoCarrinho(event) {
            const button = event.target.closest('.add-to-cart');
            if (!button) return;

            const itemElement = button.closest('.product-item');
            
            const nome = itemElement.dataset.nome;
            const precoTexto = itemElement.dataset.preco;
            const preco = parseFloat(precoTexto); 
            
            const imagem = itemElement.querySelector('img').src; 

            if (!nome || isNaN(preco)) {
                console.error("Erro: Dados do produto inválidos ou ausentes.");
                return;
            }

            const produto = {
                nome: nome,
                preco: preco,
                imagem: imagem,
                quantidade: 1
            };

            let carrinho = getCarrinho();
            
            const itemExistente = carrinho.find(item => item.nome === produto.nome);

            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push(produto);
            }

            salvarCarrinho(carrinho);
            
            alert(`${nome} foi adicionado ao carrinho!`);
        }

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', adicionarAoCarrinho);
        });

        document.addEventListener('DOMContentLoaded', () => {
            updateCarrinhoCount(getCarrinho());
        });
    