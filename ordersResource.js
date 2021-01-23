const urljoin = require('url-join');
request = require('request-promise-native').defaults({json:true});

class  OrdersResource {
    static  OrdersUrl(resourceUrl){
        const packagesServer = (process.env.PACKAGES_URL || 'http://host.docker.internal:3000/api/v1');
        return urljoin(packagesServer,resourceUrl);
    }

    static requestHeaders(){
        const ordersKey = (process.env.PACKAGES_APIKEY ||'PROYECTO@2021');
        return{

        apiKey: ordersKey
    };

}
    static getAllOrders() {
        const url = OrdersResource.OrdersUrl("/orders");
        const options = {
            headers:OrdersResource.requestHeaders()
        }
         return request.get(url, options);
    }

}

module.exports = OrdersResource