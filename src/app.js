import express from 'express';
import { productManager } from './ProductManager.js';
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
	try {
		let limit = req.query.limit;
		let productList = await productManager.getProducts();

		if (limit) {
			const productsLimited = productList.slice(0, limit);
			return res.send({ productsLimited });
		}

		return res.send({ productList });
	} catch (error) {
		return res.send(`Error: ${error}`);
	}
});

app.get('/products/:pid', async (req, res) => {
	try {
        let id = parseInt(req.params.pid);
        let pid = await productManager.getProductById(id);
        if(pid){
            return res.send(pid)
        }else{ 
            return res.send("Id de producto no encontrado")
        }
		
	} catch (error) {
		return res.send(`Error: ${error}`);
	}
});



app.listen(8080, () => {
	console.log('Server listening on port 8080...');
});
