const app = require('../server.js');
const Package = require('../packages');
const request = require('supertest');
const ApiKey = require('../apikeys.js');
const { query } = require('express');




describe("Hello World test", () => {
    it("Should do an stupid test", () =>{
        const a = 5;
        const b = 3;
        const sum = a+b;
        

        expect(sum).toBe(8);
    });
});

describe("Packages API", () =>{
    describe("GET /", () => {
        it("Should return an HTML document", () => {
            return request(app).get("/").then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("html"));
                expect(response.text).toEqual(expect.stringContaining("h1"));
            }) ;
        });
    });

    describe("GET /packages", () =>{
        beforeAll(() => {
            const packages = [
                new Package (
                {"code": "1ab",
                "order":"20011",
                "orderdelivery_date":"15/01/21",
                "statuss": "delivery"}),
                new Package ({"code": "2ab",
                "order":"212",
                "orderdelivery_date":"15/01/21",
                "statuss": "delivery"})
            ];

            const user = {
                user: "test",
                apikey: "1"
            }



            dbFind = jest.spyOn(Package, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, packages);
            });

            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            })

        });
    
        it('Should return all packages', () => {
            return  request(app).get('/api/v1/packages').set('apikey', '1').then((response) =>{
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });

    describe('POST /packages', () => {
            let dbInsert;
            const paackage = {code: "2ab",
                             order:"185",
                             orderdelivery_date: "25/01/21",
                            statuss: "delivery"};

            beforeEach(() => {
            dbInsert = jest.spyOn(Package, "create");
            });

            it('Should add a new packages if everything is fine', () => {
                dbInsert.mockImplementation((c, callback) =>{
                    callback(false);
                });

                return request(app).post('/api/v1/packages').send(paackage).then((response) =>{
                    expect(response.statusCode).toBe(201);
                    expect(dbInsert).toBeCalledWith(paackage, expect.any(Function));
                });
            });

            it('Should return 500 if there is a problem with de DB', () => {
                dbInsert.mockImplementation((c, callback) => {
                callback(true);
                });
                return request(app).post('/api/v1/packages').send(paackage).then((response) =>{
                expect(response.statusCode).toBe(500);
            });
            });

       
    });

});