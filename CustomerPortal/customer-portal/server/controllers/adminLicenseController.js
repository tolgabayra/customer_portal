const pool = require("../services/db").pool 
const env = require("../configs/config")
env.configenv

/*



SELECT
    *
FROM
    (
        SELECT
            CONCAT(model, ' - ', "surucuAdi", ' - Konfig: ', konfig_id) AS label,
            *
        FROM
            public.tb_ethernet
    ) AS e
WHERE
    e.label ILIKE '%vmx%'
;



*/


const getAllLicenses = async (req,res) => {
      try {
        const lisanslar = await pool.query(`
        select
  
        tl.id,
        tl.anahtar,
        tl.aciklama,
        tm.isim as modeladi,
        tu.isim as urunadi,
        tl."sozlesmeBitis",
        ts.isim as sube,
        tm2.isim

      FROM

        tb_lisanslar as tl

        left join tb_modeller as tm
            on tl.model_id = tm.id
            
        left join tb_urunler as tu
            on tm.urun_id = tu.id
            
        left join tb_subeler as ts
            on tl.sube_id = ts.id
           
        left join tb_musteriler as tm2
            on ts.musteri_id = tm2.id 
            
            
        `)
        if(lisanslar){
        res.status(200).json(lisanslar.rows)
        }
    } catch (err) {
        res.status(500).json(err)
    }
    
    
  }
  

  const getUsedLicenses = async (req,res) => {
    try {
      const usedlicenses = await pool.query(`
        SELECT * FROM tb_kullanici_lisans_atama
      `)
      if(usedlicenses){
        res.status(200).json(usedlicenses.rows)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }




  const updateLicense = async (req,res) => {
    const id = req.params.id
    const {sozlesmeBitis} = req.body
    const text = 'UPDATE tb_lisanslar SET "sozlesmeBitis" = $1, revizyon = revizyon +1  WHERE id = $2'

    try {
     const updatedDate = await pool.query(text, [sozlesmeBitis, id])
     res.status(200).json(updatedDate)

    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }



/*


INSERT INTO public.tb_kullanici_lisans_atama
(kullanici_id, lisans_id)
VALUES(323, unnest(array[1, 2, 3]));


*/


  const licenseAssignment = async (req,res) => {

    const { kullanici_id, lisans_id } = req.body
    const lisanslarId = req.body.lisanslar

    

    const text = 'INSERT INTO tb_kullanici_lisans_atama(kullanici_id, lisans_id) VALUES($1, $2)'
    const text2 = 'DELETE FROM tb_kullanici_lisans_atama WHERE kullanici_id = $1'
    //begin
    try {
      await pool.query('BEGIN')
      await pool.query(text2, [kullanici_id])

      lisanslarId.forEach(async (i) => 
        await pool.query(text, [kullanici_id, i])
      )

      res.status(201).json({message: "Lisans Atama İşlemi Başarılı..."})
      await pool.query('COMMIT')

    } catch (err) {
      await pool.query('ROLLBACK')
      console.log(err);
      res.status(500).json(err)
    }
  }

  

  module.exports = {
    getAllLicenses,
    getUsedLicenses,
    licenseAssignment,
    updateLicense
  }