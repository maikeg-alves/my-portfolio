import React from 'react';
import { Grid, Progress } from '@nextui-org/react';
import { Col } from 'react-bootstrap';
import { Typewriter, Layout, LoadingMy, GridLayout } from '@components';

import { TextUI } from 'styles';

import type { GetStaticProps, NextPage } from 'next';
import { prisma, Responsive } from 'libs';
import { ITech, Techmology } from 'interfaces';

const Skills: NextPage<ITech> = ({ technologys }) => {
  const [techs, setTechs] = React.useState<Techmology[]>([]);

  React.useEffect(() => {
    if (technologys != null) {
      //filter the array and main techs > 80
      setTechs(
        (technologys.slice(0, 5) as Techmology[])
          .filter((item) => item.ability >= 80)
          .sort((a, b) => b.ability - a.ability),
      );
    }
  }, [technologys]);

  return (
    <Layout justify="center">
      {technologys ? (
        <>
          <Col xs={12} className="d-flex">
            <Col
              className={`
              col-${Responsive(
                '6',
                '12',
                990,
              )} d-flex justify-content-center flex-column px-2`}
            >
              <Col xs={'auto'} className="text-center">
                <TextUI className="m-0" b size={27}>
                  <Typewriter text={['Minhas', 'Habilidades']} delay={1000} />
                </TextUI>
              </Col>
              <Grid.Container
                xs={12}
                gap={3}
                className="p-2 align-content-center"
                style={{ display: 'contents' }}
              >
                {techs.map((item) => (
                  <Grid key={item.id} className="p-2">
                    <TextUI>{item.name}</TextUI>
                    <Progress value={item.ability} color={'success'} />
                  </Grid>
                ))}
              </Grid.Container>
            </Col>
            <>
              <GridLayout {...technologys} />
            </>
          </Col>
        </>
      ) : (
        <Col xs={'auto'}>
          <LoadingMy />
        </Col>
      )}
    </Layout>
  );
};

export default Skills;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const technologys = await prisma?.technology.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
        ability: true,
        projects: true,
      },
    });

    return {
      props: {
        technologys: technologys,
      },
      revalidate: 10, //10 seconds OBSERVATION: tenho que mudar para 25 horas depois
    };
  } catch (error) {
    return {
      props: {
        technologys: null,
      },
    };
  }
};
