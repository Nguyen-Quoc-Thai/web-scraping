// function countFrom(a, b){
//     return new Promise(function(resolve, reject){
//         if(b<a){
//             reject("b must greater than a !\n")
//         }else{
//             var countFromID = setInterval(function(){
//                 if(a<=b){
//                     console.log(a);
//                     a++;
//                 }else{
//                     clearInterval(countFromID);
//                     resolve();
//                 }
//             }, 1000);
//         }
//     });
// }

// countFrom(1,5).then(function(){
//     console.log("Done");
// });


