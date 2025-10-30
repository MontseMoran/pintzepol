import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/Services.scss';

function Services() {
  return (
    <motion.section
      id="servicios"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      

      <div className="services">
        <motion.div
          className="card bg-prep"
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>PREPARACIÓN / DESENGRASE</h3>
          <p>
            Tratamiento previo y limpieza técnica de las piezas para asegurar
            máxima adherencia.
          </p>
        </motion.div>

        <motion.div
          className="card bg-polvo1"
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>PINTURA EN POLVO ELECTROSTÁTICA</h3>
          <p>Acabado resistente y uniforme para piezas metálicas y plásticas.</p>
        </motion.div>

        <motion.div
          className="card bg-polvo2"
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>PINTURA LÍQUIDA</h3>
          <p>Aplicación en cadena para series y producción industrial.</p>
        </motion.div>

        <motion.div
          className="card bg-metal"
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>RECUBRIMIENTOS METÁLICOS</h3>
          <p>Protección frente a corrosión y ambientes exigentes.</p>
        </motion.div>

        <motion.div
          className="card bg-plast"
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>PLÁSTICOS PINTADOS</h3>
          <p>Acabados de alto nivel en componentes plásticos técnicos.</p>
        </motion.div>

        <motion.div
          className="card bg-qc"
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>VERIFICACIÓN Y CONTROL DE CALIDAD</h3>
          <p>
            Inspección final pieza a pieza para garantizar el estándar exigido.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Services;

