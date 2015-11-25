function MainInit() {

    var accorditionArray    = [
        {label: 'Business Tab', content: Utils.GetElementID('onemoretab'), isUL: true},
        {label: 'Status Tab', content: Utils.GetElementID('status'), isUL: true},
        {label: 'Customers Tab', content: Utils.GetElementID('customersTab'), isUL: true},
        {label: 'Finances Tab', content: Utils.GetElementID('financesTab'), isUL: true}
    ];
    var accorditionSettings = {
        appendTo: Utils.GetElementID('accorditionID'),
        active: 'Finances Tab',
        display : 'block',
        position: 'relative',
        tabs    : accorditionArray
    };
    var accorditionObj      = new Tabs();
    accorditionObj.Init(accorditionSettings);
//    accorditionObj.RemoveTab({label: 'Status Tab'})

    accorditionObj.AppendTab({label: 'Tadija'});


}
