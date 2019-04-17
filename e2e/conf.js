exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./protractor-spec/admin-login-spec.js', './protractor-spec/logout-spec.js']
}