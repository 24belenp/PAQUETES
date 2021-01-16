const urljoin = require('url-join');
request = require('request-promise-native').defaults({json:true});

class  ProductsResource {
    static  PackagesUrl(resourceUrl){
        const packagesServer = (process.env.PACKAGES_URL || 'http://host.docker.internal:3000/api/v1');
        return urljoin(packagesServer,resourceUrl);
    }

    static requestHeaders(){
        const packagesKey = (process.env.PACKAGES_APIKEY ||'PROYECTO@2021');
        return{

        apiKey: packagesKey
    };

}
    static getAllProducts() {
        const url = ProductsResource.PackagesUrl("/products");
        const options = {
            headers:ProductsResource.requestHeaders()
        }
         return request.get(url, options);
    }

}

module.exports = ProductsResource