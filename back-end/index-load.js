const banco = require("./bd.js");

//IIFE pois as chamadas assíncronas não podem ocorrer na "main"
(async () => {
    console.log("sincronizando o banco")
    await banco.sync({ force: false });


    // lazy load
    //usando o id 2 pois é o que está cadastrado completo, com salas
    const aluno2 = await Aluno.findByPk(1);
    const turma = await aluno2.getTurma();
    console.log(`turma: ${turma.codigo}`);


    //eager load
    //const aluno2Eager = await Aluno.findByPk(2, {include: Turma})
    //console.log(`turma eager: ${aluno2Eager.turma.codigo}`)
    const aluno2Eager = await Aluno.findByPk(2, {include: Disciplina})
    for(let d of aluno2Eager.disciplinas)
        console.log(d.codigo);
})()
