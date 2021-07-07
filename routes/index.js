// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const profiles = {
  nowah: {
    name: 'Noor Wahid',
    company: 'Buroq', 
    languages: ['javascript', 'python', 'java']
  },

  sjobs: {
    name: 'steve jobs',
    company: 'apple',
    languages: ['swift', 'c++', 'objective-c']
  },

  bgates: {
    name: 'bill gates',
    company: 'microsoft',
    languages: ['visual studio', 'microsoft azure']
  }
}

router.get('/', (req, res) => {

	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
	
})

router.post('/addprofile', (req, res) => {
  const body = req.body
  body['languages'] = req.body.languages.split(', ')

  profiles[body.username] = body
  res.redirect('/profile/'+body.username)
})

router.get('/query', (req, res) => {
  const name = req.query.name
  const occupation = req.query.occupation

  const data = {
    name: name,
    occupation: occupation
  }

  res.render('profile', data)
})

router.get('/:path', (req, res) => {
  const path = req.params.path

  res.json({
    data: path
  })
})

router.get('/:profile/:username', (req, res) => {
  const profile = req.params.profile
  const username = req.params.username
  const currentProfile = profiles[username]

  if (currentProfile == null){
    res.json({
      confirmation: 'gagal',
      message: 'Profile ' + username + ' Tidak ditemukan'
    })

    return 
  }

  res.render('profile', currentProfile)
  })


module.exports = router

// nyoba ngupload project