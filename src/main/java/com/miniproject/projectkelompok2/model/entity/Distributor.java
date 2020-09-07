package com.miniproject.projectkelompok2.model.entity;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Data
@Table(name = Distributor.TABLENAME)
public class Distributor extends CommonEntity{
    public static final String TABLENAME = "t_distributor";

    
    @Id
	  @GenericGenerator(name = "sequence_dist", 
	  parameters = {@Parameter(name = "prefix", value = "DI")}, 
	  strategy = "com.miniproject.projectkelompok2.generator.DistriGenerator")
    @GeneratedValue(generator = "sequence_dist", strategy = GenerationType.AUTO)
    @Column(name = "id_dist", length = 100, nullable = false)
    private String distID;		
    @Column(name = "nama_pt", length = 50, nullable = false, unique = true)
    private String namaPT;
    @Column(name = "alamat_pt", length = 100, nullable = false)
    private String alamatPT;
    @Column(name = "npwp_pt", length = 50, nullable = false)
    private String npwpPT;

    @Column(name = "email", length = 50, nullable = false)
    private String emailPT;
    
    @Column(name = "no_telp", length = 50, nullable = false)
    private String noTelpPT;
    
    @OneToOne //(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_akun", referencedColumnName = "id_akun")
    private BankAccount bankAccount;	// noRekening dan namaPemilik
    									// namaBank (BankAccount -> ManajemenBank)

    // COBA
//    @Column(name = "isdeleted", length = 10)
//    private Boolean isDeleted = false;
}