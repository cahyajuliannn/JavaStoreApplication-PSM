package com.miniproject.projectkelompok2.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
@MappedSuperclass
public class CommonEntity {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdon", nullable = false)
    private Date createdOn;
    @Column(name = "createdby", nullable = false)
    private String createdBy;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modifiedon")
    private Date modifiedOn;
    @Column(name = "modifiedby")
    private String modifiedBy;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "deleteon")
    private Date deleteOn;
    @Column(name = "deleteby")
    private String deletedBy;

    @Column(name = "isdelete", nullable = false)
    private Boolean isDelete = false;
}
