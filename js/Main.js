function MainInit() {
    var statusContent      = Utils.GetElementID('statusContent'),
        photosContent      = Utils.GetElementID('photosContent'),
        videoContent       = Utils.GetElementID('videoContent'),
        audioContent       = Utils.GetElementID('audioContent'),
        ulContent          = Utils.GetElementID('ulcontent'),
        tadijaContent      = Utils.GetElementID('onemoretab'),
        tabwithlinkContent = Utils.GetElementID('tabwithlink'),
        appendTo           = Utils.GetElementID('tabsContainer'),
        tabWithLink        = Utils.GetElementID('tabWithLink'),
        testTab            = Utils.GetElementID('testTab');


    var statusTab   = {label: 'Status Tab', href: '#status', content: statusContent};
    var photosTab   = {label: 'Photos Tab', href: '#photos', content: photosContent, inactive: true};
    var videoTab    = {label: 'Video Tab', href: '#video', content: videoContent};
    var audioTab    = {label: 'Audio Tab', href: '#audio', content: audioContent};
    var firstULTab  = {label: 'Some Ul Content', href: '#ulcontent', content: ulContent, isUL: true};
    var secondULTab = {label: 'Tadija Tab', href: '#tadijacontent', content: tadijaContent, isUL: true, inactive: true};
    var thirdULTab  = {label: 'tabwithlink', href: '#tabwithlink', content: tabwithlinkContent, isUL: true};

    var tabs = [];
    tabs.push(statusTab, photosTab, videoTab, audioTab, firstULTab, secondULTab, thirdULTab);

    Tabs.Init({
        appendTo   : appendTo,
        before     : appendTo.childNodes[0],
        // If default tab is not present all tabs content will be hidden and showed upon tab click
        active     : 'Status Tab',
        position   : 'relative',
        display    : 'inline',
        showHTMLOn : 'click',
        showULOn   : 'mouseover',
        hideULOn   : 'mouseout',
        showChildOn: 'mouseover',
        hideChildOn: 'mouseover',
        tabs       : tabs
    });

    Tabs.AppendTab({
        label   : 'Test Tab',
        href    : '#tadija',
        content : testTab,
        isUL    : false,
        inactive: false,
        id      : 'testtab'
    });

    Tabs.RemoveTab({
        id: 'tabwithlinkID'
    });

}
