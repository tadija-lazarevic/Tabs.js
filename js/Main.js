function MainInit() {
    var statusContent      = Utils.GetElementID('statusContent'),
        photosContent      = Utils.GetElementID('photosContent'),
        videoContent       = Utils.GetElementID('videoContent'),
        audioContent       = Utils.GetElementID('audioContent'),
        ulContent          = Utils.GetElementID('ulcontent'),
        tadijaContent      = Utils.GetElementID('onemoretab'),
        tabwithlinkContent = Utils.GetElementID('tabwithlink'),
        tabWithLink        = Utils.GetElementID('tabWithLink'),
        testTab            = Utils.GetElementID('testTab');


    var statusTab   = {label: 'Status Tab', href: '#status', content: statusContent};
    var photosTab   = {label: 'Photos Tab', href: '#photos', content: photosContent, inactive: true};
    var videoTab    = {label: 'Video Tab', href: '#video', content: videoContent};
    var audioTab    = {label: 'Audio Tab', href: '#audio', content: audioContent};
    var firstULTab  = {label: 'Some Ul Content', href: '#ulcontent', content: ulContent, isUL: true};
    var secondULTab = {label: 'Tadija Tab', href: '#tadijacontent', content: tadijaContent, isUL: true, inactive: true};
    var thirdULTab  = {label: 'Tab With Link', href: '#tabwithlink', content: tabwithlinkContent, isUL: true};
    var duskoTab    = {label: 'Dusko Tab', href: '#duskotab', content: testTab};
    var gagana      = {label: 'Gagana', href: '#gagana', content: audioContent};


    var tabs = [];
    tabs.push(statusTab, photosTab, videoTab, audioTab, firstULTab, secondULTab, thirdULTab);

    var settings = {active: 'Status Tab', position: 'relative', display: 'inline', tabs: tabs};


    // Init method
    Tabs.Init(settings);

    // Add new tab
    Tabs.AppendTab(duskoTab);

    // Removing
    Tabs.RemoveTab(duskoTab);
    Tabs.RemoveTab(thirdULTab);
    Tabs.AppendTab(thirdULTab);
    Tabs.RemoveTab(statusTab);


}
