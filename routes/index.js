var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { sothunhat: '', sothuhai: '', ketqua: ''});
});

router.post('/', function(req, res){
    console.log(req.body.sothunhat);
    console.log(req.body.sothuhai);
    console.log(req.body.toantu);

    
    if(req.body.sothunhat=='' || req.body.sothuhai=='')
    {
        res.render('index', { sothunhat: '', sothuhai: '', thongbao:"Dữ liệu đầu vào trống"});
    }
    else
    {
        req.checkBody('sothunhat', 'Khong phai la so thuc').isFloat();
        req.checkBody('sothuhai', 'Khong phai la so thuc').isFloat();
    
        var errors = req.validationErrors();

        if(errors)
            res.render('index', { sothunhat: '', sothuhai: '', thongbao:"Dữ liệu đầu vào không phải số"});
        else {
            sothunhat = parseFloat(req.body.sothunhat);
            sothuhai = parseFloat(req.body.sothuhai);

            var toantu = req.body.toantu;
            var ketqua;

            switch(toantu) {
                case "cong":
                    ketqua = sothunhat + sothuhai;
                    res.render('index', { sothunhat: sothunhat, sothuhai: sothuhai, ketqua: ketqua});
                    break;
                case "tru":
                    ketqua = sothunhat - sothuhai;
                    res.render('index', { sothunhat: sothunhat, sothuhai: sothuhai, ketqua: ketqua, vuatinhtru: true});
                    break;
                case "nhan":
                    ketqua = sothunhat * sothuhai;
                    res.render('index', { sothunhat: sothunhat, sothuhai: sothuhai, ketqua: ketqua, vuatinhnhan: true});
                    break;
                case "chia":
                    if (sothuhai != 0) {
                        ketqua = sothunhat / sothuhai;
                        res.render('index', { sothunhat: sothunhat, sothuhai: sothuhai, ketqua: ketqua, vuatinhchia: true});
                        break;
                    }
                    res.render('index', { sothunhat: sothunhat, sothuhai: sothuhai,vuatinhchia: true, thongbao:"Không chia được cho 0"});
                    return;
            }
        }
    }
});

module.exports = router;