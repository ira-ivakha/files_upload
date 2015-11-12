$(function() {
    $(".loader").knob();
    $('.loader').trigger(
        'configure',
        {
            "min":0,
            "max":100,
            "fgColor":"#FF0000",
            "skin":"tron",
            "height":"20",
            "width":"20",
            "cursor":false
            //"displayInput":false
        }
    );
    $('.loader').trigger('change');

    $( ".fileitem" ).draggable({
        addClasses: false
    });
    /*
    $( ".drop-area" ).droppable({
        accept: ".fileitem"
    });
    */
    $('#upload-form').fileupload({

        dropZone: $('#drop-area'),
        add: function (e, data) {

            var tpl = $('<li class="fileitem working"><input type="text" value="0" class="loader" style="height:30px; width:30px;" /><span class="itemname"></span><span></span></li>');

            tpl.find('.itemname').text(data.files[0].name)
                .append(' <i>(' + data.files[0].size + ' b)</i>');

            // Добавляем HTML к тегам ul
            data.context = tpl.appendTo($('#uploaded-list'));

            // Initialize the knob plugin
            // Инициализация плагина
            tpl.find('input').knob();

            // Отслеживание события клика по кнопке "отмена"
            tpl.find('span').click(function(){

                if(tpl.hasClass('working')){
                    jqXHR.abort();
                }

                tpl.fadeOut(function(){
                    tpl.remove();
                });

            });

            // Автоматически загружать файл, как только он был добавлен в очередь
            var jqXHR = data.submit();
    }});
    /*$('#uploader').change(function(){
        var fileList = this.files;
        console.log(fileList);
        console.log(fileList[0].name);
        for(var i= 0; i<fileList.length; i++) {
            $('#uploaded-list').append('<li class="fileitem">'+fileList[i].name+'</li>');
        }
    });
    */
});
