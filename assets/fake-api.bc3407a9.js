const f=[["Paris",48.856614,2.352222],["Marseille",43.296482,5.36978],["Lyon",45.764043,4.835659],["Toulouse",43.604652,1.444209],["Nice",43.710173,7.261953],["Nantes",47.218371,-1.553621],["Strasbourg",48.573405,7.752111],["Montpellier",43.610769,3.876716],["Bordeaux",44.837789,-.57918],["Lille",50.62925,3.057256],["Rennes",48.117266,-1.677793],["Reims",49.258329,4.031696],["Le Havre",49.49437,.107929],["Saint-\xC9tienne",45.439695,4.387178],["Toulon",43.124228,5.928],["Angers",47.478419,-.563166],["Grenoble",45.188529,5.724524],["Dijon",47.322047,5.04148],["N\xEEmes",43.836699,4.360054],["Aix-en-Provence",43.529742,5.447427]],M=()=>new Promise(t=>{setTimeout(()=>{t()},1e3)}),p=async t=>{if(console.log("fake api: fetchCities keyword:",t),await M(),t.toLowerCase()==="fail")throw new Error("500 Server Error!");return f.filter(e=>e[0].toLowerCase().replace(/\s+/g,"").includes(t.toLowerCase().replace(/\s+/g,""))).map(e=>e[0])},d=([t,e],[a,r])=>{const l=u=>Math.PI/180*u,n=(u,w)=>Math.PI/180*(u-w),o=n(a,t),i=n(r,e),c=l(t),h=l(a),C=Math.sin(o/2)**2+Math.sin(i/2)**2*Math.cos(c)*Math.cos(h),g=2*Math.asin(Math.sqrt(C));return 6371*g},E=async t=>{if(console.log("fake api: calculateDistance cities:",t),await M(),t.includes("Dijon"))throw new Error("500 Server Error!");const e=f.reduce((n,s)=>(n.set(s[0],s),n),new Map),[a,...r]=t;return r.map((n,s)=>{const o=e.get(n);if(s===0){const c=e.get(a);return{fromCity:a,toCity:n,distance:d([c[1],c[2]],[o[1],o[2]])}}const i=e.get(r[s-1]);return{fromCity:r[s-1],toCity:n,distance:d([i[1],i[2]],[o[1],o[2]])}})};export{E as c,p as f};
