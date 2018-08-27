module.exports = {
  'base_url': 'https://vast-taiga-29858.herokuapp.com',
  'secret':'nodeauthsecret',
  'frommail': 'eduardlebedenko80@gmail.com',
  'mailgun': {
    'api_key' : 'key-0e4228878343f000e39d52fff01ff844',
    'DOMAIN' : 'mail.dinnerbell.co',
    'from': 'DinnerBell <postmaster@mail.dinnerbell.co>'
  },
  'admin_site_url': 'www.dinnerbell.co/',
  'twilio': {
    'accountSid': 'AC14d0d32ed6c82130acc0140118f445af',
    'authToken': '1c16b2c6684735a6e57935f8c93115f4',
    
    // A Twilio number you control - choose one from:
    // https://www.twilio.com/user/account/phone-numbers/incoming
    // Specify in E.164 format, e.g. "+16519998877"
    'twilioNumber': '+13472066278',
    
    // Your Authy production key - this can be found on the dashboard for your
    // Authy application
    'authyKey': 'gqCDyQhbxrdOKVus0G120RSkOprWUMsy',
  },
  'service': {
    'service_type' : {
      "general": "general",
      "cleaning": "cleaning",
      "cutlery_replace": "cutlery_replace",
      "other": "other"
    },
    'service_limit': {
      'common': 50
    }
  },
  'role_type': {
    'restaurant_manager': 'restaurant_manager',
    'super_visior': 'super_visior'
  },
  'employee_role': {
    'server': 'Server',
    'host': 'Host',
    'chef': 'Chef',
    'bar': 'Bar'
  },
  'main_menus': ['breakfast', 'brunch', 'lunch', 'daily specials', 'drink', 'desert', 'dog'],
  'pusher': {
    'appId': '487456',
    'key': '760d4bd616622b123992',
    'secret': 'c50acab890efb39b399a',
    'cluster': 'us2'
  },
  'status': {
    'approved': 'approved',
    'rejected': 'rejected',
    'pending': 'pending'
  },
  'order_status': {
    'pending': 'pending',
    'accepted': 'accepted',
    'rejected': 'rejected',
    'checkedout': 'checkedout',
  },
  'errors': {
    'invalid_params': {
      'status': 'invalid_params',
      'message': 'Invalid parameter posted'
    },
    'server_error': {
      'status': 'server_error',
      'message': 'There are errors in server'
    },
    'not_found': {
      'status': 'not_found',
      'message': 'Not Found'
    },
    'user': {
      'duplicated_email': {
        'status': 'duplicated_email',
        'message': 'Duplicated email exist'
      },
      'duplicated_account': {
        'status': 'duplicated_account',
        'message': 'Duplicated account exist'
      },
      'user_not_found': {
        'status': 'user_not_found',
        'message': 'Not found user'
      },
      'auth_fail': {
        'status': 'not_found',
        'message': 'Incorrect login information'
      },
      'incorrect_old_password': {
        'status': 'not_found',
        'message': 'Old password not matches!'
      },
      'authorization_error': {
        'status': 'not_authorized',
        'message': 'You have not right to access'
      },
      'pending': {
        'status': 'pending',
        'message': 'Your account is not approved yet.'
      },
      'rejected': {
        'status': 'rejected',
        'message': 'Your account is rejected.'
      },
      'verify_failed': {
        'status': 'incorrect_verification',
        'message': 'Verification Info is incorrect'
      }
    }
  }
};
