const Package = require('../packages.js');
const mongoose = require('mongoose');
const dbConnect = require('../db');



jest.setTimeout(30000);

describe('DB connection', () => {
    beforeAll(async () => {
        
        await dbConnect();//mongoose.connect(url, { useNewUrlParser: true});
    })

    beforeEach((done) => {
        Package.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a Package in the MongoDB', (done) => {
        const package = new Package({code: "2ab",
        statuss:"delivery",
        orderdelivery_date: "25/01/21",
        quantity:"20"});
        package.save((err, package) => {
            expect(err).toBeNull();
            Package.find({}, (err, packages) => {
                expect(packages).toBeArrayOfSize(1);
                done();
            });
            
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})